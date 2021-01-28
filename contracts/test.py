nothing = [[]]

something = nothing + nothing * 2
for i in range(3):
    something[i] += [i]

print(something)

a = [[1,2,3]]
b = a[0] + [5]
a.append(4)

print(b)

list = [3,4]

def test(list):
 list2 = list + [5]
#  list.append(5)
 print(list2)

test(list)
print(list)