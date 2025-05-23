# Deployment of Application on AWS

Allowing it to be accessible globally. This guide will walk you through the steps to deploy your application on AWS, including setting up an EC2 instance, configuring security groups, and deploying your code.

## Steps for deployment

1. **Set up an AWS Account**

    - Go to [AWS](https://aws.amazon.com/) and create an account if you don't already have one.

2. **Launch an EC2 Instance**

    - Navigate to the EC2 dashboard.
    - Click on "Launch Instance" and follow the steps to configure your instance.
    - Choose an appropriate AMI (Amazon Machine Image) and instance type.
    - In case of CODELINK : UBUNTU is used.

3. **Create Key Pair**

    - Used to access the instance with public-private keys using RSA Algorithm.
    - Use .pem format to download the key.

4. **Configure Security Groups**

    - Set up inbound rules to allow HTTP/HTTPS traffic.
    - Add your IP address to allow SSH access.
    - In case of CODELINK : Set as default.

5. **Launch Instance**

    - After configuring the machine, launch an instance on AWS Cloud.

6. **Connect to Your Instance**

    - Inside the folder containing key.
    - Use an SSH client to connect to your EC2 instance.
    - First, change the permission for you secret file (key) : `chmod 400 KEY_NAME`.
    - Then, connect to instance using SSH command like: `ssh -i your-key.pem ec2-user@your-instance-ip`.
    - For CodeLink : `ssh -i "CodeLink-secret.pem" ubuntu@ec2-13-60-45-175.eu-north-1.compute.amazonaws.com`.

7. **Install Required Software**

    - Install necessary software like Node.js, Python, or any other dependencies.

8. **Deploy Your Code**

    - Transfer your application files to the instance using SCP or Git clone.
    - Start your application, same as we do in production.
    - First, we deploy frontend.
    - Then, we deploy Backend.

9. **Deploy Frontend Application**

    - Inside frontend folder.
    - `NPM INSTALL` --> DEPENDENCIES
    - `NPM RUN BUILD` --> PRODUCTION BUILD --> Generates DIST Folder
    - TO DEPLOY FRONTEND we use `NGNIX`
        - First update our machine `sudo apt update`
        - Install NGNIX using `sudo apt install nginx`
        - Start NGNIX into your system `sudo systemctl start nginx`
        - Enable NGNIX into your system `sudo systemctl enable nginx`
        - Copy code from dist(build files) to /var/www/html/ (nginx) `sudo scp -r dist/* /var/www/html/`
        - Enable `PORT:80` on your instance (nginx is deployed on that port)
            - For this you need to change inbound rules in security group wizard and add `PORT:80` accessible from all IPs.
        - To stop the ngnix deployment: `sudo systemctl stop nginx`
    - Frontend Application is Running on : [Front-end](http://13.60.45.175/)

10. **Deploy Backend Application**

    - Inside frontend folder.
    - `NPM INSTALL` --> DEPENDENCIES
    - Add instance `IP` to network access list of mongoDB.
    - Enable `PORT:8080` for backend on the instance as the ports are blocked initially.
    - Problem with `npm start` : As the console is terminated, the application will also stop.
    - Solution : `PM2` Process Manager : Keeps your application online 24/7 `npm install pm2 -g`.
    - To start the process in background - `pm2 start npm -- SCRIPT_NAME(start in our case)`
    - To check the logs for pm2 - `pm2 logs`.
    - Some more pm2 commands : `pm2 list`, `pm2 flush <name>`, `pm2 stop <name>`, `pm2 delete <name>`, `pm2 start npm --name "Enter process NAME" -- SCRIPT_NAME(start)` (FOR CUSTOM NAME).
    - Backend Application is Running on : [Back-end](http://13.60.45.175:8080/)
    - Problem with the URL:

        - We need to remember the IP Address of the machine.
        - This can be reduced to some proxy using `proxy pass of ngnix`
        - For this we need to edit the configuration of ngnix using `sudo nano /etc/nginx/sites-available/default`
        - Edit this file, add new rule for the proxy pass (You can take it from CHATGPT).
        - Example of nginx configuration:

        ```bash
        server {
            listen 80;
            server_name 13.60.45.175;

            location /api/ {
                proxy_pass http://localhost:8080/;
                proxy_http_version 1.1;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;

                # Optional cleanup: Remove /api from the forwarded URI
                rewrite ^/api/(.*)$ /$1 break;
            }
        }
        ```

    - Restart your nginx : `sudo systemctl restart nginx`
    - Modify the BASEURL in frontend project(constants.js) to `/api` (RELATIVE PATH --> SAME LIKE http://localhost/api)    

## Adding Custom Domain Name

- Purchase domain name on GoDaddy(Domain Registrar).
- Signup on CloudFlare and ADD a new domain name.
- Change nameserver on godaddy and point it to cloudflare.
- Wait for sometime till nameserver are updated.
- Manage DNS from Cloudflare
- DNS record: A domain.name IP
- Enable SSL for website (FULL or FLEXIBLE)

## NOTE

Secure Cookies is been turned off, as I am not purchasing any domain for now. So, I am not able to access the cookies as the request is been secure but not having https.

```js
// Cookies Options
export const options = {
    httpOnly: true,
    // FOR DEV ENVIRONMENT
    // secure: true,
    // sameSite: "None",
    // partitioned: true,
    expires: new Date(Date.now() + 8 * 3600000),
};
```