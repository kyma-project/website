---
title: "Issuing JWT security best practices"
author: 
  name: "Karol Szwaj, Istio and API Gateway @Kyma"
tags:
  - Kyma
  - Service Mesh
  - Security

redirectFrom:
  - "/blog/jwt-best-practices"
---

I'm part of the Kyma team working on Istio and API Gateway features. In this blog post, I'm going to discuss best practices for issuing JSON Web Tokens (JWTs).

## Overview

JSON Web Tokens (JWTs) are a popular way to securely transmit information between parties. Because the tokens can be signed and encrypted to ensure their integrity and confidentiality, they're often used for authentication and authorization purposes.
As the use of JSON Web Tokens (JWTs) is becoming more widespread, it's important to follow best practices to ensure that the tokens are secure and can be trusted. The Internet Engineering Task Force (IETF) has published a set of best practices for JWTs in RFC 8725. In this blog post, I'd like to highlight some key points from the RFC to help you issue secure JWTs.

## Best practices

### Set the **alg** header parameter in JWSs

Signed JWTs carry an explicit indication of the signing algorithm in the **alg** header parameter. However, this can lead to vulnerabilities if the algorithm is not properly validated. For example, an attacker might change the algorithm to `none`. Some libraries might trust this value and *validate* the JWT without checking its signature. To mitigate this risk, ensure that the **alg** or **enc** JWT header specifies the same algorithm that is used for the cryptographic operation.
The **alg** (algorithm) header parameter in JSON Web Signature (JWS) specifies the cryptographic algorithm used to sign the JWT. It's important to ensure that the JWT is signed with the intended algorithm. The server should also verify that the algorithm is on the allowlist of approved algorithms and reject any JWTs with an unrecognized algorithm.

### Set the **enc** header parameter in JWEs

Similarly to the **alg** header in JWSs, the **enc** (encryption) header parameter in a JSON Web Encryption (JWE) specifies the cryptographic algorithm used to encrypt a JWT. It's important to ensure that a JWT is encrypted with the intended algorithm. The server should also verify that the algorithm is on the allowlist of approved algorithms and reject any JWTs with an unrecognized algorithm.

### Avoid using the `none` algorithm in JWT

Unless a JWT is cryptographically protected end-to-end by TLS in the transport layer or by any other means, the `none` algorithm should not be used in production environments, as it does not provide any cryptographic protection for the JWT. Use the `none` algorithm only for development purposes, and even in this case, proceed with caution.

### Avoid using unsafe or deprecated algorithms

Avoid using unsafe or deprecated algorithms in JWTs. As unsafe, consider those algorithms which have known vulnerabilities or are superseded by newer and more secure ones.
The algorithm used to sign a JWT should be appropriate for the needed level of security. As an example, RSA-PKCS1 v1.5 encryption algorithms should be avoided.

### Remember about key management practices

JWTs rely on the security of the underlying cryptographic keys. Keyed MAC algorithms can be vulnerable to brute-force attacks if they are used to sign tokens with weak symmetric keys, such as human-memorizable passwords. To mitigate this risk, avoid using symmetric signing whenever possible. Nowadays, there are not many use cases where using symmetric instead of asymmetric signing is needed. If symmetric signing must be used,  make sure that human-memorizable passwords are not directly used as the key to a keyed-MAC algorithm like HS256.
Use secure key management practices, such as rotating keys regularly and protecting them from unauthorized access. To prevent unauthorized access, use strong passwords or passphrases for symmetric keys and protect private keys with appropriate permissions and access controls. 
Cryptographic keys used in JWTs should be of sufficient size to ensure their security. For example, the minimum recommended size for an RSA key is 2048 bits. Use keys of adequate size to avoid potential vulnerabilities.

### Avoid compression before encryption

Data should not be compressed before encryption, as it can reveal information about the plaintext and weaken the security of a JWT.

### Use only UTF-8 encoding

JWTs should only use UTF-8 encoding because other encodings, such as UTF-16 and UTF-32, are not allowed by the latest JSON standard (RFC 8259). Ensure that each JWT is properly encoded and not susceptible to injection attacks.

### Always use HTTPS

JWTs should be transmitted over HTTPS to ensure their confidentiality and integrity. Using HTTP instead of HTTPS can leave JWTs vulnerable to man-in-the-middle attacks.

### Use short expiration times 

JWTs should have short expiration times to reduce the window of opportunity for attackers to use them. The short expiration times also help mitigate the impact of a JWT being compromised. It's generally advised not to set the expiration time to more than a few hours. You can adjust it using the **exp** (expiration) claim in a JWT.

### Use JWT claims appropriately

Use JWT claims appropriately and only include the necessary amount of information. For example, don't include sensitive information like passwords in a JWT.

### Prevent replay attacks

Replay attacks occur when an attacker intercepts a JWT and tries to use it multiple times to gain unauthorized access to protected resources. To prevent this type of attack, consider using the `jti` (JWT ID) claim. This claim is a unique identifier that can be used to prevent a JWT from being used more than once.
You can also prevent replay attacks by including a `nonce` in authenticated requests.

### Follow good security practices

Finally, follow good security practices in general to protect JWTs against threats. Keep your software and libraries up to date, follow secure coding practices, and properly configure your servers and infrastructure.

## Conclusion

Following these best practices can help ensure that your JWTs are secure and can be trusted. Remember to properly validate algorithms, use strong keys, verify public keys, and use HTTPS to transmit JWTs. Regularly review and update your JWT issuance process to stay up-to-date with the latest security practices.
By following these guidelines, you can help protect JWTs against potential vulnerabilities and ensure their security. 

I hope you find this blog post helpful. Please don't hesitate to reach out to us if you have any questions or comments.

## References

[[1]](https://datatracker.ietf.org/doc/html/rfc8725) OAuth Working Group - RFC 8725 - JWT security best practices