import math

class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def __repr__(self):
        return f"Rectangle(width={self.width}, height={self.height})"
    
    def set_width(self, newWidth):
        self.width = newWidth

    def set_height(self, newHeight):
        self.height = newHeight

    def get_area(self):
        return self.width * self.height
    
    def get_perimeter(self):
        return (2*self.width + 2*self.height)

    def get_diagonal(self):
        return ((self.width**2 + self.height**2) ** 0.5)
    
    def get_picture(self):
        if self.width>50 or self.height>50:
            return "Too big for picture."
        picture = []
        for i in range(self.height):
            #each row is 1 height
            picLine = ""
            for j in range(self.width):
                #each column is 1 width
                picLine = picLine + "*"
            
            picture.append(picLine)
        
        outPic = ""
        for line in picture:
            outPic = outPic + line + '\n'
        
        return outPic
            
    
    def get_amount_inside(self, shape):
        largeArea = self.get_area()
        smallArea = shape.get_area()
        return int(math.floor(largeArea / smallArea))


class Square(Rectangle):
    def __init__(self, side):
        self.side = side
        super().__init__(self.side, self.side)
    
    def __repr__(self):
        return f"Square(side={self.side})"

    def set_side(self, newSide):
        self.side = newSide
        super().set_height(newSide)
        super().set_width(newSide)

    def set_width(self, newWidth):
        self.set_side(newWidth)
    
    def set_height(self, newHeight):
        self.set_side(newHeight)



rect = Rectangle(1, 1)
rect.set_width(51)
rect.set_height(3)
print(rect.get_picture())
