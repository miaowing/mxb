# MXB.CC

My personal blog develop with keystonejs and next.js.

<p align="left">
    <a href="https://travis-ci.org/miaowing/blog" target="_blank">
        <img src="https://travis-ci.org/miaowing/blog.svg?branch=master" alt="Travis"/>
    </a>
</p>

## Deploy

### ConfigMap
```yaml
apiVersion: v1
data:
  .env.production: |
    EXTERNAL_URL=https://mxb.cc
    MONGO_URI=mongodb://username:password@mongo-service:27017/database
    REDIS_HOST=redis-service
    SESSION_STORE=mongo

    NETEASE_PHONE=
    NETEASE_PASSWORD=
    NETEASE_COUNTRY_CODE=86
    SING_USERNAME=
    SING_PASSWORD=

    MAILER_HOST=smtp.qq.com
    MAILER_USER=
    MAILER_PASS=
    MAILER_NAME=MXB

    ALI_ACCESS_KEY=
    ALI_SECRET_KEY=
    ALI_REGION=oss-cn-beijing
    ALI_BUCKET=mxbcc

    TENCENT_SECRET_ID=
    TENCENT_SECRET_KEY=
    CAPTCHA_APP_ID=
    CAPTCHA_SECRET_KEY=
kind: ConfigMap
metadata:
  name: mxb-configmap
  namespace: default
```

### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: mxb
  name: mxb
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mxb
  template:
    metadata:
      labels:
        app: mxb
    spec:
      containers:
        - image: zfeng/blog:latest
          imagePullPolicy: IfNotPresent
          name: mxb
          volumeMounts:
            - mountPath: /usr/src/app/packages/keystone/.keystone/.env.production
              name: volume-config
              subPath: .env.production
      restartPolicy: Always
      volumes:
        - name: volume-config
          configMap:
            name: mxb-configmap
            items:
              - key: .env.production
                path: .env.production
```

### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mxb-service
  namespace: default
spec:
  clusterIP: None
  ports:
    - port: 3000
      protocol: TCP
      targetPort: 3000
  selector:
    app: mxb
  type: ClusterIP
```

## Development

```shell
yarn
npm run dev
```
