
 # Requirements:
  1. Create a Task.
  2. Assign task to a User.
  3. Update:
     * a. Set estimates on a task.
     * b. Mention start date in a task. (Calculate end date).
  4. A task can have 3 states: open, in-progress, complete.
  5. Search:
      * a. Show all tasks under a user.
      * b. Users can filter the tasks according to task state.
  6. Add user
 
 # Additional feature:
 1. Create tasks under a story.
 2. A task can be a child of another task.
 3. Parent task can display effort by adding all the efforts of child tasks.
 4. Generate Report.

===========================================================

# Development and deployments

### Git helper commands 
reset a file: git reset HEAD -- (file-path)
 
### Steps for Frontend Deployment

1. Go to /frontend
2. Run `npm run build` to generate build directory
3. Go to build directory in Windows explorer
4. select all files in build folder and make a zip file out of it.
5. Log in into AWS account: https://aws.amazon.com/ (Make sure to switch to Mumbai region).
6. In search Bar -> Go to 'Amplify'
7. Go to Effort tracker -> Click on deploy updates.
8. Choose the zip file created and upload it.
9. Click 'Save and Deploy'.
10. In the Aplify effort tracker dashboard clik onn the public URL.

### Steps for backend deployment

#### Part 1: ECR docker image upload

1. go to /backend folder 
2. Build project: ./gradlew build (to give permission: chmod +x gradlew)
3. Make sure you have AWS access / secret key of IAM user.
4. Run `aws configure` and enter access and secret key.
5. build docker image: `docker build -t effort_tracker .`

5. Login to AWS docker ECR registry [replace with actual values in <>]:

```
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
```

7. Get the ecr registry url: Aws account -> ECR -> effort tracker registry -> get url
8. Tag image with ecr registry: docker tag effort_tracker:latest (ecr-registry url)
9. push docker image: docker push (ecr registry url)

#### Part 2: Pull docker image in ec2

1. Make sure you have pem file to ssh into ec2 host.
2. Go to Ec2 -> get instace public hostname
3. Login to EC2: `ssh -i "efforttracker.pem" (ec2 public host name)`.
4. Make sure docker is installed other wise install it. To check runn `docker ps`.
5. Run steps: 4 and 6 from part 1 (aws configure and docker login)
6. Pull docker image from ecr: docker pull (ecr registry name)
7. Run docker image: `docker run -d -p 8080:8080 effort_tracker`.
8. backend server should be up on public ec2 url:8080





