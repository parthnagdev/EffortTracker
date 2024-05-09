
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
 
# Steps for Frontend Deployment

1. Go to /frontend
2. Run 'npm run build' to generate build directory
3. Go to build directory in Windows explorer
4. select all files in build folder and make a zip file out of it.
5. Log in into AWS account: https://aws.amazon.com/ (Make sure to switch to Mumbai region).
6. In search Bar -> Go to 'Amplify'
7. Go to Effort tracker -> Click on deploy updates.
8. Choose the zip file created and upload it.
9. In the Aplify effort tracker dashboard clik onn the public URL.