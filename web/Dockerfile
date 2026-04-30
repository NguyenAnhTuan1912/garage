FROM nginx:alpine

# Xóa cấu hình mặc định của Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copy file cấu hình của bạn vào container
COPY nginx.conf /etc/nginx/conf.d/

# Copy mã nguồn web vào thư mục phục vụ của Nginx
COPY ./dist /usr/share/nginx/www

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]