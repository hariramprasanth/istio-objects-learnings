# Timeout POC

This POC is to understand how timeout rules work.

There are two cases explored in this POC:

- A request flowing through couple of services
- A client-server request

## 1. Client Server Request

### Application setup

- One nginx pod
- One delayed service pod
- One Service for each pod

### Istio Setup

- One virtual service for any one of the services

### Requirement

To understand the behaviour of timeout rules in both client and server ends.

### Use Cases

- Let pod 1 be a nginx container and pod 2 be a delayed service container. Apply timeout rules to delayed service(server).

- Let pod 2 be a nginx container and pod 1 be a delayed service container. Apply timeout rules to nginx pod(client).

### POC insights

- When timeout rule of 3s is applied to the server and the response is delayed for 5s, the server responds with 504 as the timeout rule kicks in.

- When timeout rule of 3s is applied to the client and the response is delayed for 5s, the server responds with 200 after the given delay time.

- The timeout rules apply only on server envoy proxy and not on the client envoy proxy.

- Irrespective of the namespace where the client lies, the timeout rule won't work if applied to client proxy

---
## 2. Request Through Services

### Application setup

- One mediator pod which can make a call to given API.
- One delayed service pod
- One service for each pod

### Istio Setup

- Ingress gateway is applied for the mediator service. Mediator service makes a call to the delayed service.
- One virtual service for delayed service
- One virtual service for mediator

### Requirement

To understand the behavior of timeout rule in a chain of services.

### Use Case

- Timeout rule is applied to the mediator service.
- Timeout rule is applied to both mediator and delayed service.

### POC insights

- When the mediator service calls the delayed service with delay of 5s and timeout of 3s is applied to the mediator service, we get 504 response from the mediator service as the it has timed out to send the response to the client(postman, browser). At this point, the mediator service acts as upstream service.

- When the mediator service calls the delayed service with delay of 5s and timeout of 3s is applied to the delayed service, 504 is returned to the mediator service. This response is handled and the mediator service return a proper error response.

