FROM nginx:1.13.12-alpine
ADD dist /usr/share/nginx/html
ADD default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80:80
EXPOSE 443:443
ENTRYPOINT /bin/bash -c "nginx -g 'daemon off;'"

