# Free code camp python project 1

def arithmetic_arranger(problems, printSum = False):
  if len(problems) > 5:
    return "Error: Too many problems."
  
  line1 = ''
  line2 = ''
  line3 = ''
  line4 = ''

  count = 0
  # loop through each problem in the list
  for problem in problems:
      if count != 0:
          line1 = line1 + '    '
          line2 = line2 + '    '
          line3 = line3 + '    '
          line4 = line4 + '    '

      #split each problem into its components (2 numbers and 1 operator)
      splits = problem.split(" ")
      num1 = splits[0]
      operator = splits[1]
      num2 = splits[2]

      if (operator != '-') and (operator != '+'):
        return "Error: Operator must be '+' or '-'."

      if (len(num1) > 4) or (len(num2) > 4):
        return "Error: Numbers cannot be more than four digits."

      try:
        number1 = int(num1)
        number2 = int(num2)
      except:
        return "Error: Numbers must only contain digits."
    
      if len(num1) > len(num2):
          totalLength = len(num1) + 2
          line1 = line1 + "  " + num1
          line2 = line2 + operator
          for i in range(totalLength - len(num2) - 1): #-1 to account for operator
              line2 = line2 + " "
          line2 = line2 + num2
          for j in range(totalLength):
              line3 = line3 + "-"
      else: 
          totalLength = len(num2) + 2
          line2 = line2 + operator + " " + num2
          for i in range(totalLength):
              line3 = line3 + "-"
          for j in range(totalLength - len(num1)):
              line1 = line1 + " "
          
          line1 = line1 + num1

      if operator == '-':
          sum = int(num1) - int(num2)
      else:
          sum = int(num1) + int(num2)

      sum = str(sum)
      for i in range(totalLength - len(sum)):
          line4 = line4 + " "
          
      line4 = line4 + sum

      count = count + 1
    
  arranged_problems = line1 + '\n' + line2 + '\n' + line3
    
  if printSum == True:
      arranged_problems = arranged_problems + '\n' + line4
  
  return arranged_problems


print(arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"], True))