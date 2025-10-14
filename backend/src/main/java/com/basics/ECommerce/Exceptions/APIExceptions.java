package com.basics.ECommerce.Exceptions;

public class APIExceptions extends RuntimeException{
    private static final long SERIALVERSIONUID = 1L;

    public APIExceptions() {
    }

    public APIExceptions(String message) {
        super(message);
    }
}
