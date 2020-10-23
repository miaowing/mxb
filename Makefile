IMAGE_NAME=zf.ink
IMAGE_VERSION=2.0.0


build:
	yarn
	npm run build
image:
	yarn
	npm run build
	yarn install --production
	docker build -t $(IMAGE_NAME):$(IMAGE_VERSION) .
