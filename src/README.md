# Docker Notes

docker build . -t al-validate
docker tag al-validate thorlogic/al-validate
docker push thorlogic/al-validate
docker run -d -p 8080:80 al-validate

# github

ng build --prod --output-path docs --base-href /validation/