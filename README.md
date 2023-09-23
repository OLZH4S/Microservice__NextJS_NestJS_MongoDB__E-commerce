# Microservice__NextJS_NestJS_MongoDB__E-commerce

### Instructions
1. Start docker
2. Copy this repo
3. Run `docker-compose up --build`
4. Wait lines from nextjs as it should be last
    - `2023-09-23 20:35:49   ▲ Next.js 13.5.1`
    - `2023-09-23 20:35:49   - Local:        http://localhost:3333`
5. App available at `https://localhost`
6. Docs at `http://localhost:8811/api-docs`


## Notes
1. Added nginx
2. Added redis
3. Used onion architecture
4. Nextjs app router
5. Next based on logic close to server actions
     - Intentionally did not use redux and redux pattern overall
     - Current app is very php alike as server actions are

## Additional points
1. If you want to check CRUD then
     - Press on burger menu
     - Choose `Become a seller`
     - Create account (there are no checks)
     - Login
     - Press `Add product`
