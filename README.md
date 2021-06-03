# Tinker Tailor Docker Spy

## Story

Basically, you got the million dollar idea. It is an application that you made in codecool a while back. However, as every application needs to run somewhere constantly, and as they require a a bigger amount of resources, your laptop just won't cut it. And that is why you're thinking about moving it to cloud. Managing projects on a bigger scale requires cooperation. Even from people you don't know! Using packages from other open source projects could accelerate your progress quite a bit. So you should use other people's packages for Kubernetes deployments. As you can't do those with the default Kubernetes configuration files, how you might ask? The answer is Helm.

---
## What I have learned during the project?

- Dockerize an application
- Host the application on k8s
- Build a monitoring stack for the app in k8s
- Use helm effectively to install software to my cluster

---
## How to use?
### Prerequisites
- WS account
- AWS CLI
- Docker
- Kubectl
- Eksctl

1. Install AWS CLI and configure it

2. Install docker, kubectl and eksctl

3. Go to the ```docker``` folder, and create a Docker image, ```docker build -t <your-dockerimage-name> .```
	- To make sure that it works well, use the following command: ```docker run -d -p 80:80 <your-image-name>```, and then your browser connect to ```localhost:80```, then stop the container

4. Create a AWS repository and upload the image (follow the AmazonECR userguide)

5. Create a cluster with eksctl

6. Go to the ```k8s``` folder, and in the deployment.yaml, put your AWS ECR repository's URI to the deployment section container/image field

7. Use the following to deploy to the cluster: ```kubectl apply  -f deployment.yaml```
	- Use ```kubectl get services mill-app-service -n mill-game```, and find the sercive's external-ip, and use it in your browser

8. Install Helm

9. Create a Helm chart: ```helm create <your-chart-name>```

10. Copy the ```helm``` folder content to your previously generated chart's folder
	- in the values.yaml file change the image/repository field to your AWS ECR repository's URI

11. Install the chart to your cluster

12. Install Prometheus and Grafana to your cluster to monitoring


---

## Background materials

- <i class="fas fa-circle"></i> [AWS CLI install](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- <i class="fas fa-circle"></i> [AWS CLI configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
- <i class="fas fa-circle"></i> [K8S install](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
- <i class="fas fa-circle"></i> [EKSCTL userguide](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html)
- <i class="fas fa-circle"></i> [EKSCTL getting started](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html)
- <i class="fas fa-circle"></i> [AWS ECR getting started](https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html)
- <i class="fas fa-circle"></i> [HELM install](https://helm.sh/docs/intro/install/)
- <i class="fas fa-circle"></i> [AWS - Monitoring using Prometheus and Grafan](https://www.eksworkshop.com/intermediate/240_monitoring/)
