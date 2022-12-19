import copy
import random
# Consider using the modules imported above.

#Suppose there is a hat containing 5 blue balls, 4 red balls, and 2 green balls. What is the probability that a random draw of 4 balls will contain at least 1 red ball and 2 green balls? While it would be possible to calculate the probability using advanced mathematics, an easier way is to write a program to perform a large number of experiments to estimate an approximate probability.

#First, create a Hat class in prob_calculator.py. The class should take a variable number of arguments that specify the number of balls of each color that are in the hat. For example, a class object could be created in any of these ways:

class Hat:
    def __init__(self, **kwargs):
        self.initialContents = []
        for key, value in kwargs.items():
            for i in range(value):
                self.initialContents.append(key)
        self.contents = self.initialContents.copy()

    def draw(self, numToDraw):
        #reset contents to initial
        self.contents = self.initialContents.copy()
        removed = []

        if numToDraw > len(self.contents):
            return -1
        # randomly remove number of balls from contents, and store in removed array
        for i in range(numToDraw):
            randomChoice = self.contents.pop(random.randrange(len(self.contents)))
            removed.append(randomChoice)
        
        # return list of removed balls
        return removed



def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    num_passed = 0
    for i in range(num_experiments):
        drawResults = hat.draw(num_balls_drawn)
        if drawResults == -1:
            return 1.0
        #check if expected balls is contained in drawResult
        success = True
        for k,v in expected_balls.items():
            if not success:
                break
            for j in range (v):
                if k in drawResults:
                    drawResults.remove(k)
                else:
                    success = False
                    break
        #draw results needs to be empty to indicate pass
        if success:
            num_passed += 1


    probability = num_passed / num_experiments
    return probability


myHat = Hat(yellow=5,red=1,green=3,blue=9,test=1)
print(experiment(hat=myHat, expected_balls={"yellow":2,"blue":3,"test":1}, num_balls_drawn=20, num_experiments=100))
print(myHat)