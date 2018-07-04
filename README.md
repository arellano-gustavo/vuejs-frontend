# vuejs-frontend
This is a repo containing only the src froma VueJS project that uses a docker image as a base platform. In this way, a developer only needs to run the associated image with this repo as a volume.

<ul>
  <li>mkdir example & cd example</li>
  <li>git clone https://github.com/arellano-gustavo/vuejs-frontend.git</li>
  <li>docker run -it -p 7777:8080 -v /home/ubuntu/example/vuejs-frontend:/sample/src kebblar/vuejs bash</li>
  <li>Go to: http://localhost:7777</li>
</ul>
