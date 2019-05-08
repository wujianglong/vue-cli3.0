FROM ccr.ccs.tencentyun.com/zonst/nodejs:v8.16.0
add . /home/
workdir /home/
#run curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
#run curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
#run yum install yarn nodejs -y
run yarn install && yarn run build

FROM ccr.ccs.tencentyun.com/zonst/nginx:exam
copy --from=build /home/dist /home/dist
expose 80
