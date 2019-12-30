FROM node:10.18.0-alpine

# Create a work space for running application and copy all files into
# that work space.
ADD . /opt/frontend
WORKDIR /opt/frontend

# Install dependencies to run next application
RUN npm install

# Export port running the application to host machine
EXPOSE 3000

CMD [ "npm", "run", "dev" ]
