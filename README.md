# Library Loading

The goal was to satisfy the following conditions:
- List of all possible categories should be displayed on the left
- Display component count beside category name of how many components are currently in it based on search
- When search is not empty only categories that have at least one component should be displayed
- On the right display a list of components that belong to selected category filtered by search
- Do not debounce search input. UI should filter on every keypress.

## Extras
Virtual Lists were add to be able to load bigger datasets