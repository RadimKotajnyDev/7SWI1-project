# Auth flow
## register - pokud uživatel nemá účet
- login - přihlášení, vrátí jwt token a setne do cookies refresh token
pokud dostanu 401 - tak zavolám refresh, který vrátí nový jwt a setne nový refresh token do cookies


## Example
- login -> vratí jwt a refresh token v cookies -> /userProfile -> vratí user profile
- register -> vratí jwt a refresh token v cookies -> CREATE /userProfile -> pro vytvoření user profile