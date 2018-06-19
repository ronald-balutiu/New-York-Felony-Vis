import csv

objects = []
with open('cleaned_data.csv', 'rt') as crime_data:
    reader = csv.reader(crime_data, delimiter = ',')
    rownum = 0 # For skipping the header row
    for row in reader:
        if (rownum):
            obj = {}
            for i in range(19):
                if (i == 0):
                    obj["precinct"] = row[i];
                else:
                    year = str(i + 1999)
                    obj[year] = row[i]
            objects.append(obj)
        rownum += 1

print(objects)
