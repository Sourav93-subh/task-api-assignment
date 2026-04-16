## Bug #1: Invalid default status

Location:
src/services/taskService.js

Issue:
New tasks are created with status "todo", which is not part of the allowed values.

Expected:
Status should be "pending"

Impact:
Breaks API consistency and filtering

Fix:
Set default status to "pending"

## Bug #2: Incorrect status on completion

Location:
src/services/taskService.js

Issue:
Task status becomes "done" instead of "completed"

Impact:
Violates API contract

Fix:
Update status to "completed"

## Bug #3: Priority changes on completion

Issue:
Completing a task changes priority from "high" to "medium"

Impact:
Unexpected data mutation

Fix:
Do not modify priority in completion logic

## Bug #4: Server instability

Issue:
Server crashes intermittently (connection reset)

Possible Cause:
Unhandled exceptions

Fix:
Add proper error handling

