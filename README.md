# eventRaft-Assignment

> RelationShip Builder Application

## Build Setup
1> In client folder(frontend) Copy env.example to .env and change its IP to localhost or to your respective IP.
2> Need to have Neo4j MongoDb with NodeJS install on your server.

``` bash
# install dependencies
npm install   -->In Root Directory(SERVER)
cd client     -->Into FRONTEND
npm install
cd ..


# serve with hot reload at localhost:8001
npm run dev     --> From ROOT directory (CONSURRENTLY will run both server and client with single command)


--------**---------
I'll Deploye this application to the aws with the AMI's of mainly of ubuntu or redhat. If this application has 
a load of 1M per day so it is very important for a DevOps engineer to make that application available for every 
individual which in technical term is know as hHgh Availability(HA), So any critical component of our server fails then 
also our application serve, For AWS EC2 and other compute services AWS provide HA such as load balancing, auto scaling
etc. For RDS or other databases it provides options of automatically deploying databases with standby replicas in different zones. IN Storage services like S3 and EBS it provide built in HA.
Amazon also provides AKS which is a fully managed Kubernetes service, which is secure, reliable and Scalable. Kubernetes is basically for Container orchaestration which manage containers(PODS) very efficiently it scales on thier own, provide high security to the application by the use of secrets in kubernetes.
For Continuous Integration of the application i will definately use jenkins. Jenkins at every interval of time checks wether there is new commit or not. If there is one then it start build process on their own and gives us complete build or image. This is a Automation which saves time and also much eficient. If we like to do more automation then we will definately use Ansible, which is a really very brilliant aitomation tool works on playbook written in YAML syntax.






```
