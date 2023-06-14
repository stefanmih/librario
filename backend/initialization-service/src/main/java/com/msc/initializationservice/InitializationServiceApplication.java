package com.msc.initializationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@ComponentScan(basePackages = {"com.msc.initializationservice.config"})
public class InitializationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InitializationServiceApplication.class, args);
	}

}
