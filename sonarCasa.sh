sonar-scanner \
  -Dsonar.projectKey=horario-no-ponto-api \
  -Dsonar.sources=src \
  -Dsonar.language=ts \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=de91346d916b9ffd11ed01ca1baf04c47f04e705
  -Dsonar.exclusions=**/__mocks__/**,**/*.spec.ts \
  -Dsonar.coverage.exclusions=**/src/main.ts,**/*.spec.ts,**/*.module.ts,**/__mocks__/**,**/common/**,**/*.service.ts,**/*.config.ts,**/*.schema.ts,**/*.providers.ts
