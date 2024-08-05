package com.worq.worcation.common.Exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    public ResourceNotFoundException() {

    }
    public ResourceNotFoundException(Throwable cause) {
        super(cause);
    }
}
