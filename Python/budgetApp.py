import math

class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []

    def deposit(self, amount, description=""):
        self.ledger.append({
            "amount": amount,
            "description": description
        })

    def withdraw(self, amount, description=""):
        #check if funds are available
        if self.check_funds(amount):
            self.ledger.append({
                "amount": amount*-1,
                "description": description
            })
            return True
        else:
            return False

    def get_balance(self):
        currentBalance = 0
        for line in self.ledger:
            currentBalance = currentBalance + line["amount"]
        return currentBalance

    def transfer(self, amount, budgetCategory):
        destinationDesc = "Transfer to " + budgetCategory.name
        sourceDesc = "Transfer from " + self.name
        
        if self.withdraw(amount, destinationDesc): #successful withdrawl
            budgetCategory.deposit(amount, sourceDesc)
            return True
        else:
            return False

    def check_funds(self, amount):
        balance = self.get_balance()

        if amount > balance:
            return False
        else: 
            return True

    #format printing of class
    def __str__(self):
        line1Chars = 30 - len(self.name)
        line1 = ""
        if line1Chars % 2 == 0: #even spacing
            iRange = line1Chars / 2
            jRange = iRange
        else:
            iRange = math.floor(line1Chars / 2)
            jRange = iRange + 1
        
        for i in range(int(iRange)):
            line1 = line1 + "*"
        line1 = line1 + self.name
        for j in range(int(jRange)):
            line1 = line1 + "*"

        line1 = line1 + "\n"

        ledgerLine = ""
        for ledgerItem in self.ledger:
            descLen = len(ledgerItem["description"])
            if descLen > 23:
                ledgerItemDesc = ledgerItem["description"][:23]
            else:
                ledgerItemDesc = ledgerItem["description"]
                for i in range(23-descLen):
                    ledgerItemDesc = ledgerItemDesc + " "

            amountStr = str("{:.2f}".format(ledgerItem["amount"]))
            amountLen = len(amountStr)
            if amountLen > 7:
                ledgerItemAmt = amountStr[:7]
            else:
                ledgerItemAmt = ""
                for j in range(7-amountLen):
                    ledgerItemAmt = ledgerItemAmt + " "
                ledgerItemAmt = ledgerItemAmt + amountStr
            
            ledgerLine = ledgerLine + ledgerItemDesc + ledgerItemAmt + '\n'

        categoryBalance = self.get_balance()
        totalBalance = str("{:.2f}".format(categoryBalance))
        totalLine = "Total: " + totalBalance
            
        return line1+ledgerLine+totalLine

def create_spend_chart(categories):
    output = "Percentage spent by category"
    # setup graph (array of strings)
    graph = []
    percentNum = 100
    while percentNum >= 0:
        if percentNum == 100:
            line = str(percentNum) + "| "
        elif percentNum == 0:
            line = "  " + str(percentNum) + "| "
        else:
            line = " " + str(percentNum) + "| "
        graph.append(line)
        percentNum -= 10
    graph.append("    -")
    
    totalSpent = 0
    withdrawls = []
    for category in categories:
        withdrawlTotal = calcWithdrawl(category)
        withdrawls.append({
            "name": category.name,
            "spent": withdrawlTotal
        })
        totalSpent = totalSpent + withdrawlTotal
    
    for category in withdrawls:
        name = category["name"]
        spent = category["spent"]
        percent = (math.floor((spent/totalSpent)*10))*10 #round to nearest 10

        # add info to graph
        indexO = int((100 - percent)  / 10)
        
        # add o's or spaces
        index = 0
        for line in graph:
            if index < indexO: #add spaces
                graph[index] += "   "
            elif index < 11:  #add o
                graph[index] += "o  "
            elif index == 11:
                graph[index] += "---"
            else:
               continue 
            
            index += 1
            
        #start name of category at line 12
        for i in range(len(name)):
            graphIndex = i + 12

            if graphIndex == 12:
                #check if new line
                if graphIndex >= len(graph):
                    graph.append("     ")
                
                graph[graphIndex] = graph[graphIndex] + name[i] + "  "
            
            else:
                if graphIndex >= len(graph):
                    newLine = True
                    currLineLen = 0
                else:
                    newLine = False
                    currLineLen = len(graph[graphIndex])
                
                #check length of currentLine and previousLine
                lineDiff = len(graph[graphIndex-1])-currLineLen
                newLineStr = ""
                if lineDiff > 3:
                    #add needed spaces
                    for z in range(lineDiff-3):
                        newLineStr += " "
                
                if newLine:
                    graph.append(newLineStr)
                else:
                    graph[graphIndex] += newLineStr

                graph[graphIndex] = graph[graphIndex] + name[i] + "  "
    
    #build bar graph
    for k in range(len(graph)):
        output = output + '\n' + graph[k]    

    return output

def calcWithdrawl(category):
    withdrawlTotal = 0
    for ledgerItem in category.ledger:
        amount = ledgerItem["amount"]
        if amount < 0:
            withdrawlTotal = withdrawlTotal + (amount*-1)
    return withdrawlTotal

food = Category("Food")
entertainment = Category("Entertainment")
business = Category("Business")
food.deposit(900, "deposit")
entertainment.deposit(900, "deposit")
business.deposit(900, "deposit")
food.withdraw(105.55)
entertainment.withdraw(33.40)
business.withdraw(10.99)

print(business)
print(food)
print(entertainment)
print(create_spend_chart([business, food, entertainment]))
