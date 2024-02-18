package com.efforttracker.tracker;

import com.efforttracker.models.Task;
import com.efforttracker.models.User;
import com.efforttracker.models.filter.Filter;

import java.util.List;

/**
 * Requirements:
 * 1. Create a Task.
 * 2. Assign task to a User.
 * 3. Update:
 *     a. Set estimates on a task.
 *     b. Mention start date in a task. (Calculate end date).
 * 4. A task can have 3 states: open, in-progress, complete.
 * 5. Search:
 *      a. Show all tasks under a user.
 *      b. Users can filter the tasks according to task state.
 * 6. Add user
 *
 * Additional feature:
 * 1. Create tasks under a story.
 * 2. A task can be a child of another task.
 * 3. Parent task can display effort by adding all the efforts of child tasks.
 * 4. Generate Report.
 */
public class EffortTracker {

    public void addUser(final User user) {

    }

    public void createTask(final Task task) {

    }

    public void assignTask(final Task task, final User user) {

    }

    public void updateTask(final Task task, final User user) {

    }


    public List<Task> getTasks(final Filter filter) {
        return null;
    }
}
