all: webpack aws

aws:
	aws s3 cp build s3://carbon-footprint --region 'us-east-2' --recursive --exclude "*DS_Store" 

webpack:
	yarn build
