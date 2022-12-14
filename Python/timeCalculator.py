import math

def add_time(startTime, duration, dayOfWeek=""):
    days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    splitStart = startTime.split(":")
    startHour = splitStart[0]
    splitStart2 = splitStart[1].split(" ")
    startMin = splitStart2[0]
    amPm = splitStart2[1]

    splitDuration = duration.split(":")
    durationHour = splitDuration[0]
    durationMin = splitDuration[1]
    
    # Convert to military time
    if amPm == 'AM':
        #check midmight
        if startHour == '12':
            startHour = 0
        else:
            startHour = int(startHour)
    else:
        #check noon
        if startHour == '12':
            startHour = 12
        else:
            startHour = int(startHour) + 12
    
    startMin = int(startMin)
    # Convert duration to add to minutes
    addMin = (int(durationHour)*60) + (int(durationMin))

    totalMin = startMin + addMin
    totalHrs = math.floor(totalMin / 60)
    totalMin = totalMin % 60

    newHour = startHour + totalHrs
    newMin = totalMin
    if newMin < 10:
        newMin = "0" + str(newMin)
    else:
        newMin = str(newMin)

    # need to get number of days that were added
    numDays = math.floor(newHour / 24)
    newHour = newHour % 24

    # convert back from miliary
    if newHour == 0: 
        newTime = "12:" + newMin + " AM"
    elif newHour < 12:
        newTime = str(newHour) + ":" + newMin + " AM"
    elif newHour == 12:
        newTime = str(newHour) + ":" + newMin + " PM"
    else:
        newHour = newHour - 12
        newTime = str(newHour) + ":" + newMin + " PM"
    
    # format next day text
    appendText = ""

    # handle the optional day
    if dayOfWeek != "":
        dayIndex = days.index(dayOfWeek.lower())
        dayIndex = dayIndex + numDays
        if dayIndex >= 7:
            dayIndex = dayIndex % 7

        newTime = newTime + ", " + days[dayIndex].capitalize()

    if numDays > 0:
        if numDays == 1:
            appendText = " (next day)"
        else:
            appendText = " (" + str(numDays) + " days later)"
    
    newTime = newTime + appendText

    print(newTime)

add_time("8:16 PM", "466:02", "tuesday")