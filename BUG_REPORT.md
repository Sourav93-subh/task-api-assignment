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

Status: Fixed

Fix Applied:
Changed default status from "todo" to "pending"

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

## Bug #5: Missing validation for priority field

Location:
src/utils/validators.js (or task creation logic)

Issue:
API accepts invalid priority values such as "super-high"

Steps to reproduce:
POST /tasks with:
{
  "title": "Test",
  "priority": "super-high"
}

Expected:
Only "low", "medium", "high" should be allowed

Actual:
Invalid values are accepted

Impact:
Data inconsistency and unreliable filtering

Fix:
Add validation to restrict priority to allowed values

## Bug #6: Task can be completed multiple times

Location:
taskService.js

Issue:
Calling PATCH /tasks/:id/complete multiple times is allowed

Steps:
1. Complete a task
2. Call complete again

Expected:
Should return error or ignore if already completed

Actual:
Task is processed again

Impact:
Incorrect timestamps and inconsistent state

Fix:
Check if task is already completed before updating

## Bug #7: Improper handling of invalid task ID

Location:
routes/tasks.js

Issue:
Invalid or non-existent task IDs may not consistently return 404

Steps:
PATCH /tasks/invalid-id/complete

Expected:
Return 404 Not Found

Actual:
May return incorrect response or crash

Impact:
Unreliable API behavior

Fix:
Validate ID and return proper HTTP status codes

## Bug #8: Inconsistent task status lifecycle

Issue:
Task status transitions do not follow defined states:
"pending → in-progress → completed"

Actual:
"todo → done"

Impact:
Breaks expected workflow and API documentation

Fix:
Enforce valid state transitions

