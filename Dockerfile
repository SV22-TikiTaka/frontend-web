FROM node:18.4.0-alpine
#USER root

WORKDIR /frontend-web
COPY . /frontend-web
RUN yarn install

# uri 변수 형태로 받아서 url에 넣어 작동하도록 함
ENV REACT_APP_HOST_IP_ADDRESS $API_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

RUN yarn --ignore-platform
COPY . ./

# build file을 개발용에서는 불러오지 않기 때문에 개발용에서는 npm start 가능
RUN yarn build
RUN yarn global add serve
# local 에서는 위에 2개 대신 아래 코드만
# RUN yarn run build