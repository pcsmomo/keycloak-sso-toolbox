# SingleSignOnContextType Structure Changes

## Overview

This document outlines the structural changes made to the `SingleSignOnContextType` interface, which is core to the SSO implementation.

## Version Comparison

### Previous Version (v2)

```typescript
{
    initialized: false,
    isLoading: true,
    loginError: false,
    sso: {
        clientId,
        authenticated,
        token,
        refreshToken,
        referrer
    }
}
```

### Current Version (v3)

```typescript
{
    initialized: boolean,
    authenticated: boolean,
    idToken: string,      // openid token
    token: string,        // access token
    refreshToken: string, // refresh token
    useAxios: (baseURL: string) => AxiosInstance,
    login: () => void,
    logout: () => void
}
```

## Detailed Changes

### Removed Properties

- **isLoading**: Loading state management removed from context
- **loginError**: Error state management removed from context
- **sso (nested object)**: Flattened structure for simpler access
  - `clientId`: Moved to configuration
  - `referrer`: Removed from context

### Added Properties

- **idToken**: New OpenID token property for identity verification
- **useAxios**: Utility function for creating authenticated Axios instances
- **login**: Explicit function for initiating login flow
- **logout**: Explicit function for handling logout

### Structural Improvements

1. **Flattened Structure**
   - Authentication properties moved to root level
   - Removed unnecessary nesting
   - Simplified property access

2. **Type Safety**
   - Added explicit TypeScript type definitions
   - Integration with Axios types
   - Clear function signatures

3. **Enhanced Functionality**
   - Direct access to authentication methods
   - Built-in Axios integration
   - Clearer separation of tokens (ID, access, refresh)

## Migration Guide

### Accessing Properties

Old way:

```typescript
const { sso: { authenticated, token } } = context;
```

New way:

```typescript
const { authenticated, token } = context;
```

### Making HTTP Requests

Old way:

```typescript
// Manual axios configuration needed
```

New way:

```typescript
const axiosInstance = context.useAxios(baseURL);
// Ready to use with authentication
```

### Authentication Actions

Old way:

```typescript
// Implementation specific
```

New way:

```typescript
context.login();  // Start login flow
context.logout(); // Handle logout
```

## Notes

- The new structure promotes a more maintainable and type-safe implementation
- Removal of loading and error states suggests these should be handled by the consuming components
- Integration with Axios provides a standardized way to make authenticated requests
