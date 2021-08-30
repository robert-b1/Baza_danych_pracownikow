package com.springbootwithangular.springbootwithangular;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

//adnotacja umożliwiająca odczytanie zaszyfrowanego hasła bazy danych
@EnableEncryptableProperties
@SpringBootApplication
public class SpringbootwithangularApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootwithangularApplication.class, args);
	}

	@Bean
	//metoda, która pozwoli na przekazywanie danych z bazy danych z hosta 8080 do hosta 4200
	//CORS(Cross Origin Resource Sharing - udostępnianie zasobów między źródłami)
	//jest to do datkowy filtr, który wykorzystuje dodatkowe nagłówki HTTP, wtedy serwer decyduje czy klijent jest
	//zaufany i czy udostępnić mu dane - zapobiega atakom Cross Site Request Forgery
	public CorsFilter corsFilter(){
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Authorization", "Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}
}
