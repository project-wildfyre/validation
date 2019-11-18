# Docker Notes

Should run npm build in docker but as a temp work around build locally via (having issues with npm install inside docker container)

npm build -prod --output-path=dist


docker build . -t al-validate
docker tag al-validate thorlogic/al-validate
docker push thorlogic/al-validate
docker run -d -p 8080:80 al-validate

# github

ng build --prod --output-path docs --base-href /validation/