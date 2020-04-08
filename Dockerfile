FROM nginx:latest
LABEL maintainer = 'wangcylive@outlook.com'
ADD ./dist /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80