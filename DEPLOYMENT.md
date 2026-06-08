# AWS EC2 & Jenkins Deployment Guide (with GitHub Webhook Integration)

This guide walks you through the step-by-step setup required to deploy the containerized TanStack Start application to an AWS EC2 instance, utilizing **GitHub** and **GitHub Webhooks** for automated CI/CD triggering on push events.

In this setup, **Jenkins runs directly on the target EC2 instance**, pulling the code from GitHub, building the Docker image locally, and running the container on the same server. This removes the need for Docker Hub or SSH Agent credentials.

---

## Step 1: AWS EC2 Instance Setup

### 1. Launch Instance
- **OS/AMI:** Choose **Ubuntu Server 22.04 LTS** (or newer).
- **Instance Type:** Minimum **t3.small** (2 vCPUs, 2 GiB RAM) is highly recommended. Running TypeScript compilations, Vite builds, Docker, and Jenkins on a `t2.micro` (1 GiB) will likely trigger Out-Of-Memory (OOM) crashes.
- **Key Pair:** Create or select an existing key pair. Download the `.pem` file (e.g., `ec2-key.pem`).

### 2. Configure Security Group Rules
Open the following ports in your EC2 instance's inbound rules:

| Port Range | Protocol | Source | Description |
| :--- | :--- | :--- | :--- |
| `22` | TCP | `0.0.0.0/0` (or your IP) | SSH Access (for admin control) |
| `80` | TCP | `0.0.0.0/0` | HTTP traffic (public web access via Nginx) |
| `443` | TCP | `0.0.0.0/0` | HTTPS traffic (SSL web access via Nginx) |
| `8080` | TCP | `0.0.0.0/0` (or your IP / GitHub CIDRs) | Jenkins Web Interface (needs to be public for GitHub Webhooks) |

> [!WARNING]
> **GitHub Webhook Access:** For GitHub to send webhook notifications to Jenkins, your Jenkins instance port `8080` must be accessible from the internet. You can restrict the source IP range for port `8080` to [GitHub's official Webhook IP ranges](https://api.github.com/meta) for security, or keep it open to `0.0.0.0/0`.

---

## Step 2: Install Docker and Git on EC2

SSH into your EC2 instance:
```bash
ssh -i "ec2-key.pem" ubuntu@<your-ec2-ip>
```

Run the following commands to install Docker and Git:
```bash
# Update package lists
sudo apt-get update -y
sudo apt-get upgrade -y

# Install prerequisite packages
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release git

# Add Docker’s official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up the stable repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Allow the ubuntu user to run Docker commands without sudo
sudo usermod -aG docker ubuntu

# Apply group membership changes
newgrp docker
```

---

## Step 3: Install Jenkins

Install OpenJDK 21 and Jenkins on your build server:
```bash
# Install OpenJDK 21 (required by latest Jenkins versions)
sudo apt-get install -y openjdk-21-jre

# Add Jenkins repository key and source list
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt-get update -y
sudo apt-get install -y jenkins

# Start and enable Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Add the 'jenkins' system user to the docker group
# (Crucial: enables Jenkins to run Docker commands locally without sudo)
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Initial Jenkins Setup
1. Open `http://<your-ec2-ip>:8080` in your web browser.
2. Retrieve the admin password from the EC2 terminal:
   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```
3. Copy the password, paste it in the browser, and select **Install suggested plugins**.
4. Create your first admin user.

---

## Step 4: Configure GitHub Credentials in Jenkins

If your GitHub repository is **private**, Jenkins needs credentials to pull the code.

In Jenkins, go to **Manage Jenkins** -> **Credentials** -> **System** -> **Global credentials** -> **Add Credentials**:
- **Kind:** Username with password (or SSH Username with private key)
- **Username:** Your GitHub username
- **Password:** A GitHub **Personal Access Token (PAT)** with `repo` scopes (generate this in GitHub under *Settings -> Developer settings -> Personal access tokens -> Tokens (classic)*)
- **ID:** `github-repo-credentials`

*(Note: Docker Hub Credentials and EC2 SSH Deployment Keys are not needed, as all builds and runs are executed locally on the host.)*

---

## Step 5: Configure Jenkins Plugins

Ensure the following plugin is installed under **Manage Jenkins** -> **Plugins** -> **Installed plugins** (if missing, search under **Available plugins**):
1. **GitHub Integration Plugin** (Enables webhook triggers)

*(Note: "Docker Pipeline" and "SSH Agent" plugins are not required, as we run raw Docker commands directly in the shell scripts).*

---

## Step 6: Set up GitHub Webhook on GitHub

To trigger a Jenkins build immediately whenever code is pushed to GitHub:

1. Go to your repository on **GitHub.com**.
2. Click on the **Settings** tab.
3. Select **Webhooks** from the left-hand menu.
4. Click the **Add webhook** button.
5. Configure the following fields:
   - **Payload URL:** `http://<your-jenkins-ec2-ip>:8080/github-webhook/`
     > [!IMPORTANT]
     > The trailing slash `/` after `github-webhook/` is **mandatory**. Without it, Jenkins will return a redirection error, and the webhook trigger will fail.
   - **Content type:** `application/json`
   - **Secret:** Leave blank (or enter a secret if you configured it in Jenkins System configuration).
   - **Which events would you like to trigger this webhook?:** Select **Just the push event.**
   - **Active:** Ensure this checkbox is checked.
6. Click **Add webhook**.
7. Under Webhooks, verify that a green checkmark appears next to your webhook, indicating GitHub successfully reached your Jenkins endpoint.

---

## Step 7: Create the Jenkins Pipeline Job

1. On the Jenkins Dashboard, click **New Item**.
2. Name it `racube-frontend` and select **Pipeline**. Click **OK**.
3. Under the **General** tab:
   - Check **GitHub project** and enter your repository URL (e.g. `https://github.com/username/racube_frontend/`).
4. Under the **Build Triggers** tab:
   - Check **GitHub hook trigger for GITScm polling**. (This option enables the repository hook to trigger the build).
5. Under the **Pipeline** section:
   - **Definition:** Pipeline script from SCM
   - **SCM:** Git
   - **Repository URL:** `https://github.com/username/racube_frontend.git`
   - **Credentials:** Select the `github-repo-credentials` you created in Step 4 (if the repo is private).
   - **Branch Specifier:** `*/main` (or the branch you want to build).
   - **Script Path:** `Jenkinsfile`
6. Click **Save**.

### Test Trigger
Push a minor change to your repository. Navigate to Jenkins to verify that a new build (Build #1) triggers automatically.

---

## Step 8: Configure Nginx Reverse Proxy & SSL on EC2

To serve your application securely on port `80`/`443` with Let's Encrypt:

1. **Install Nginx:**
   ```bash
   sudo apt-get install -y nginx
   ```
2. **Create Site Configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/racube
   ```
   Paste the following configuration:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded-for;
       }
   }
   ```
3. **Enable Site & Restart Nginx:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/racube /etc/nginx/sites-enabled/
   sudo rm -s /etc/nginx/sites-enabled/default || true
   sudo nginx -t
   sudo systemctl restart nginx
   ```
4. **Obtain SSL using Certbot:**
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```
   Follow the interactive prompts to generate the certificate and automatically redirect HTTP to HTTPS.

---

## Troubleshooting Webhooks

- **Red exclamation mark in GitHub Webhooks:** Go to GitHub -> Repository Settings -> Webhooks, click your webhook, scroll down to **Recent Deliveries**, and inspect the response headers/body.
- **Error 403 (No valid crumb):** If you see this in the delivery logs, go to **Manage Jenkins** -> **Configure Global Security** -> **CSRF Protection** and verify that "Enable proxy compatibility" is checked.
- **Port Blocked:** Ensure AWS Security Group rules allow port `8080` (or `80` if using a proxy for Jenkins) from GitHub's IP range or `0.0.0.0/0`.
