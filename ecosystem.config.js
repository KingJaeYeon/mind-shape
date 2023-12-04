module.exports = {
  apps: [
    {
      name: "mind-shape", // 애플리케이션의 이름입니다. 이 이름으로 PM2에서 애플리케이션을 식별합니다.
      script: "npm", // PM2가 실행할 스크립트입니다. 여기서는 npm을 사용합니다.
      args: "start", // 스크립트에 전달할 인자입니다. npm 스크립트 중 'start' 명령어를 실행합니다.
      env: {
        NODE_ENV: "production", // 환경 변수입니다. 여기서는 NODE_ENV를 'production'으로 설정합니다.
        PORT: 1212, // 애플리케이션에서 사용할 포트를 설정합니다.
      },
      watch: false, // 파일 변경 감지를 사용하지 않습니다. true로 설정하면 파일 변경시 애플리케이션이 자동으로 재시작합니다.
      exec_mode: "fork", // 실행 모드입니다. 'fork' 모드는 단일 인스턴스를 실행합니다.
      instances: 1, // 실행할 인스턴스의 수입니다. 'max'로 설정하면 CPU 코어 수만큼 인스턴스를 실행합니다.
      autorestart: true, // 프로세스가 실패할 경우 자동으로 재시작합니다.
      max_memory_restart: "1G", // 메모리 사용량이 1GB를 초과할 경우 자동으로 재시작합니다.
    },
  ],
};
