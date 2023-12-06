FROM nginx:1.17.1-alpine
ADD dist /usr/share/nginx/html
ADD default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]

