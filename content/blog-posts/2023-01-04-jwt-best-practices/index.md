---
title: "JWT security best practices"
author: 
  name: "Karol Szwaj, Istio and API Gateway @Kyma"
tags:
  - Kyma
  - Service Mesh
  - Security

redirectFrom:
  - "/blog/jwt-best-practices"
---
## Introduction

I'm part of the Kyma team working on Istio and API Gateway features. In this blog post, I'll be discussing best practices for issuing JSON Web Tokens (JWTs).

## Overview

JSON Web Tokens (JWTs) are a popular way to securely transmit information between parties. They are often used for authentication and authorization, and can be signed and encrypted to ensure their integrity and confidentiality. 
As the use of JSON Web Tokens (JWTs) becomes more widespread, it's important to follow best practices to ensure that they are secure and can be trusted. The Internet Engineering Task Force (IETF) has published a set of best practices for JWTs in RFC 8725. In this blog post, we'll highlight some key points from the RFC to help you issue secure JWTs.

## Threats and Vulnerabilities

### Weak Signatures and Insufficient Signature Validation

Signed JWTs carry an explicit indication of the signing algorithm in the "alg" header parameter. However, this can lead to vulnerabilities if the algorithm is not properly validated. For example, an attacker might change the algorithm to "none" and some libraries might trust this value and "validate" the JWT without checking any signature. To mitigate this risk, ensure that "alg" or "enc" JWT header specifies the same algorithm that is used for cryptographic operation,  and should specify allowlist of algorithms to use. Additionally, the "none" algorithm should not be accepted unless the JWT is cryptographically protected by other means. It should only be used for development purposes and prohibited in production environments.

### Weak Symmetric Keys

Keyed MAC algorithms can be vulnerable to brute-force attacks if they are used to sign tokens with weak symmetric keys, such as human-memorizable passwords. To mitigate this risk, it's generally a good idea to avoid using symmetric signing whenever possible. Nowadays, there are probably not many use cases where you would have to use symmetric signing instead of asymmetric. If symmetric signing must be used,  make sure that human-memorizable passwords are not directly used as the key to a keyed-MAC algorithm like HS256.


### Incorrect Composition of Encryption and Signature

All cryptographic operations used in a JWT must be validated, and the entire JWT must be rejected if any of them fail to validate. This is true not only for JWTs with a single set of header parameters, but also for nested JWTs, in which both outer and inner operations must be validated using the keys and algorithms supplied by the application.

### Plaintext Leakage through Analysis of Ciphertext Length

Compressing data before encryption can reveal information about the plaintext and should be avoided.

### Insecure Use of Elliptic Curve Encryption

Some cryptographic operations, such as Elliptic Curve Diffie-Hellman key agreement ("ECDH-ES"), take inputs that may contain invalid values, such as points not on the specified elliptic curve or other invalid points. It's important to validate these inputs before using them, or to use underlying cryptographic libraries that do so. Additionally, ECDH-ES ephemeral public key (epk) inputs should be validated according to the recipient's chosen elliptic curve. If the "X25519" or "X448" algorithms are used, the security considerations in RFC 8037 apply.

### Multiplicity of JSON Encodings

Previous versions of the JSON format allowed several different character encodings: UTF-8, UTF-16, and UTF-32. However, the latest standard only allows UTF-8 except for internal use within a "closed ecosystem". It's important to ensure that JWTs use only UTF-8 encoding to avoid potential vulnerabilities.

### Substitution Attacks

In order to protect against substitution attacks, it's important to validate the "iss" (issuer) and "sub" (subject) claims in a JWT. If the JWT contains an "iss" claim, the application should validate that the cryptographic keys used for the cryptographic operations in the JWT belong to the issuer. This can be done through means such as referencing a JSON metadata document that contains a "jwks_uri" value that is an "https" URL from which the issuer's keys are retrieved as a JWK Set. When the JWT contains a "sub" claim, the application should validate that the subject value corresponds to a valid subject and/or issuer/subject pair at the application, which may include confirming that the issuer is trusted by the application. If the issuer, subject, or the pair are invalid, the application should reject the JWT.

### Indirect attacks on the server 

It's important to protect against indirect attacks on the server when using JWTs. This includes taking precautions to prevent SQL or LDAP injection vulnerabilities when using the "kid" (key ID) header for key lookup, and protecting against server-side request forgery (SSRF) attacks when blindly following a "jku" (JWK set URL) or "x5u" (X.509 URL). To mitigate these risks, it's important to validate and/or sanitize received values and to match URLs to a whitelist of allowed locations, ensuring that no cookies are sent in GET requests.
Additionally, JWT claims that are used to perform lookup operations or that include URLs should be carefully validated to ensure that they do not present opportunities for injection attacks or SSRF attacks. It's also a good idea to ensure that claims in the JWT header match those specified in JWKs and to reject any JWTs that don't match. By taking these precautions, you can help protect your server against indirect attacks when using JWTs.

### Insufficient Key Size

Cryptographic keys used in JWTs should be of sufficient size to ensure their security. For example, the minimum recommended size for an RSA key is 2048 bits. It's important to use keys of adequate size to avoid potential vulnerabilities.

### Insufficient Verification of Public Keys

The public keys used to verify JWT signatures should be thoroughly validated to ensure that they belong to the intended party. This includes verifying the certificate chain and checking for certificate revocation.

### Insecure Use of Key Identifiers

The "kid" (key ID) header parameter is used to indicate the key that was used to sign a JWT. However, it's important to ensure that the "kid" value is properly validated and not blindly trusted. An attacker could potentially use a spoofed "kid" value to trick the recipient into using the wrong key to verify the signature.

## Best practices

### Validate and enforce the "alg" Header Parameter in JWSs

The "alg" (algorithm) header parameter in a JSON Web Signature (JWS) specifies the cryptographic algorithm used to sign the JWT. It's important to validate this parameter and enforce it to ensure that the JWT is signed with the intended algorithm. This includes verifying that the algorithm is on an allowlist of approved algorithms and rejecting any JWTs with an unrecognized algorithm.

### Validate the "enc" Header Parameter in JWEs

Similar to the "alg" header in JWSs, the "enc" (encryption) header parameter in a JSON Web Encryption (JWE) specifies the cryptographic algorithm used to encrypt the JWT. It's important to validate this parameter to ensure that the JWT is encrypted with the intended algorithm. This includes verifying that the algorithm is on an allowlist of approved algorithms and rejecting any JWTs with an unrecognized algorithm.

### Avoid using "none" Algorithm in JWSs and JWEs

The "none" algorithm should not be used in production environments, as it does not provide any cryptographic protection for the JWT. It should only be used for development purposes, and even then it should be used with caution.

### Avoid using unsafe or deprecated algorithms

It's important to avoid using unsafe or deprecated algorithms in JWTs. This includes algorithms that have known vulnerabilities or have been superseded by newer, more secure algorithms.
The algorithm used to sign a JWT should be appropriate for the level of security needed. 

### Remember about key management practices

JWTs rely on the security of the underlying cryptographic keys. It's important to use secure key management practices, such as rotating keys on a regular basis and protecting keys from unauthorized access. This includes using strong passwords or passphrases for symmetric keys and protecting private keys with appropriate permissions and access controls.

### Validate all cryptographic input used in JWT

It's important to validate all cryptographic inputs used in JWTs to ensure that they are legitimate and not maliciously constructed. This includes verifying that elliptic curve points used in key agreement algorithms are on the specified curve and that other inputs conform to the requirements of the cryptographic operation.

### Avoid compression before encryption

Data should not be compressed before encryption, as it can reveal information about the plaintext and weaken the security of the JWT.

### Use only UTF-8 encoding

JWTs should only use UTF-8 encoding, as other encodings such as UTF-16 and UTF-32 are not allowed by the latest JSON standard (RFC 8259). It's also important to ensure that the JWT is properly encoded and not susceptible to injection attacks.

### Use of HTTP Instead of HTTPS

JWTs should be transmitted over HTTPS to ensure their confidentiality and integrity. Using HTTP instead of HTTPS can leave JWTs vulnerable to man-in-the-middle attacks.

### Use short expiration times 

JWTs should have short expiration times to reduce the window of opportunity for attackers to use them. This also helps mitigate the impact of a JWT being compromised. It's generally a good idea to set the expiration time to no more than a few hours.

### Implement rate limiting

Implementing rate limiting can help prevent brute force attacks, in which an attacker tries to guess the key used to sign a JWT. By limiting the number of attempts that can be made within a certain time frame, you can make it more difficult for attackers to guess the key.

## Conclusion

In summary, following these best practices can help ensure that your JWTs are secure and can be trusted. It's important to properly validate algorithms, use strong keys, verify public keys, and use HTTPS to transmit JWTs. It's also a good idea to regularly review and update your JWT issuance process to stay up-to-date with the latest security practices.
By following these guidelines, you can help protect against potential vulnerabilities and ensure the security of your JWTs. 


I hope you will find this blog post helpful, and please don't hesitate to reach out to us if you have any questions or comments.

## References

[[1]](https://datatracker.ietf.org/doc/html/rfc8725) OAuth Working Group - RFC 8725 - JWT security best practices