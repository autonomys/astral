import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, // or specify origins like ['http://localhost:3000']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Accept', 'X-API-KEY'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Autonomys Astral API')
    .setDescription('Autonomys Astral API documentation')
    .setVersion('0.0.1')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-API-KEY',
        in: 'header',
        description: 'Enter your API key',
      },
      'X-API-KEY',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customCss = `
    /* Logo and TopBar Styling */
    .swagger-ui .topbar { 
      background-color: #27355D;
      padding: 10px 0;
    }

    /* Method Badges */
    .swagger-ui .opblock-get .opblock-summary-method { 
      background-color: #ABCFEF; 
    }
    .swagger-ui .opblock-post .opblock-summary-method { 
      background-color: #91D3A0; 
    }
    .swagger-ui .opblock-put .opblock-summary-method { 
      background-color: #fca130; 
    }
    .swagger-ui .opblock-delete .opblock-summary-method { 
      background-color: #f93e3e; 
    }

    /* Improve Contrast and Readability */
    .swagger-ui .opblock-description-wrapper p,
    .swagger-ui .opblock-external-docs-wrapper p,
    .swagger-ui .opblock-title_normal p {
      color: #3b4151;
    }

    /* Make the API version number more visible */
    .swagger-ui .info .title small {
      background: #27355D;
      color: white;
    }

    /* Optional: Add a subtle hover effect to tryout buttons */
    .swagger-ui .btn.try-out__btn:hover {
      background-color: #344268;
    }
  `;

  SwaggerModule.setup('docs', app, document, {
    customCss,
    customfavIcon: '/assets/favicon.ico',
    customSiteTitle: 'Autonomys Astral API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      displayRequestDuration: true,
      defaultModelsExpandDepth: 3,
      defaultModelExpandDepth: 3,
      security: [{ 'X-API-KEY': [] }],
      securityDefinitions: {
        'X-API-KEY': {
          type: 'apiKey',
          name: 'X-API-KEY',
          in: 'header',
        },
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
