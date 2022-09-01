<p align="center">
  <img src="./assets/opize.png" width="10%" alt="Opize" />
</p>
<h1 align="center">opize-client</h1>
<h5 align="center">Opize API를 위한 라이브러리</h5>
<p align="center">
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-blue"/></a>
  <img alt="MIT License" src="https://img.shields.io/badge/Language-Typescript-blue?logo=typescript"/>
</p>

---


## install
```
yarn add opize-client
```

## Usage

```typescript
import { Client } from 'opize-client';

const client = new Client({
    auth: '(opize API Token)'
})

;(async () => {
    console.log(await client.user.get())
});
```
