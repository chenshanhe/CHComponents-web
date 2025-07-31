# 使用官方 nginx alpine 版本作为基础镜像
FROM nginx:alpine

# 维护者信息（可选）
LABEL maintainer="chenshanhe <421190919@qq.com>"

# 删除默认 nginx 静态资源
RUN rm -rf /usr/share/nginx/html/*

# 拷贝 build 后的静态文件到 nginx 目录
COPY dist/ /usr/share/nginx/html/

# 可选：自定义 nginx 配置（如有需要可取消注释并提供 nginx.conf）
# COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]