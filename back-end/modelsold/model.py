# Import ABC (Abstract Base Class) and abstractmethod to create abstract classes
from abc import ABC, abstractmethod 

# This is an abstract class for a model
# All models (like regression or clustering models) will inherit from this class so that we can use them in the same way

class model(ABC):
    # Initialization function for creating an instance of the model
    # This is an abstract method that must be implemented in the subclasses
    @abstractmethod
    def __init__(self, data):
        pass

    # This is an abstract method that takes an input and outputs a prediction
    # Subclasses must define how to handle predictions
    @abstractmethod
    def predict(self, input):
        pass

