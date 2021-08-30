package com.springbootwithangular.springbootwithangular.exception;

//klasa powstała, aby obsłużyć nowy wyjątek
public class UserNotFoundException extends RuntimeException{

    //metoda do wyświetlenia wiadomości po pojąwieniu się wyjątku
    public UserNotFoundException(String message) {
        super(message);
    }
}
