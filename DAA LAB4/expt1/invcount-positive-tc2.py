# Brute force method to count the number of inversions in a list
def count_inversions_brute_force(arr):
    inversions = 0
    n = len(arr)
    
    # Compare each pair (i, j) where i < j
    for i in range(n):
        for j in range(i + 1, n):
            if arr[i] > arr[j]:
                inversions += 1
                
    return inversions

# Divide and conquer (merge sort) method to count the number of inversions in a list
def count_inversions_divide_and_conquer(arr):
    return merge_sort(arr, 0, len(arr) - 1)

def merge_sort(arr, left, right):
    if left >= right:
        return 0
    
    mid = (left + right) // 2
    inversions = merge_sort(arr, left, mid)
    inversions += merge_sort(arr, mid + 1, right)
    inversions += merge_and_count(arr, left, mid, right)
    
    return inversions

def merge_and_count(arr, left, mid, right):
    # Left and right subarrays
    left_subarray = arr[left:mid + 1]
    right_subarray = arr[mid + 1:right + 1]
    
    i = j = 0
    k = left
    inversions = 0
    
    # Merge while counting inversions
    while i < len(left_subarray) and j < len(right_subarray):
        if left_subarray[i] <= right_subarray[j]:
            arr[k] = left_subarray[i]
            i += 1
        else:
            arr[k] = right_subarray[j]
            inversions += (mid - i + 1 - left)  # Count inversions
            j += 1
        k += 1
    
    # Copy remaining elements
    while i < len(left_subarray):
        arr[k] = left_subarray[i]
        i += 1
        k += 1
    
    while j < len(right_subarray):
        arr[k] = right_subarray[j]
        j += 1
        k += 1
        
    return inversions


# The provided nested list
students_random_numbers = [[1, 2, 4, 0],[8, 1, 8, 9],[2, 5, 4, 5],[3, 8, 3, 5], [5, 0, 8, 1],
 [9, 9, 2, 7],
 [7, 0, 9, 5],
 [3, 0, 5, 0],
 [9, 5, 7, 9],
 [0, 2, 3, 4],
 [2, 2, 6, 3],
 [4, 0, 6, 4],
 [9, 5, 4, 3],
 [0, 8, 6, 7],
 [5, 7, 0, 2],
 [3, 9, 9, 5],
 [6, 7, 0, 6],
 [9, 8, 2, 1],
 [1, 4, 9, 4],
 [9, 5, 3, 3],
 [3, 6, 6, 5],
 [2, 8, 2, 6],
 [9, 7, 8, 6],
 [9, 5, 6, 2],
 [7, 2, 0, 0],
 [6, 3, 6, 9],
 [4, 7, 0, 7],
 [2, 2, 2, 9],
 [8, 8, 1, 4],
 [1, 7, 7, 3],
 [9, 9, 7, 3],
 [1, 9, 1, 9],
 [6, 3, 7, 3],
 [1, 6, 6, 3],
 [5, 9, 2, 3],
 [8, 7, 5, 5],
 [1, 5, 3, 8],
 [9, 1, 1, 1],
 [4, 5, 7, 7],
 [2, 1, 9, 7],
 [4, 1, 1, 0],
 [0, 8, 2, 9],
 [3, 9, 6, 7],
 [4, 2, 3, 9],
 [4, 4, 4, 0],
 [9, 8, 6, 4],
 [7, 1, 7, 9],
 [5, 3, 1, 6],
 [4, 8, 9, 7],
 [1, 4, 7, 3],
 [6, 3, 3, 0],
 [8, 6, 8, 6],
 [6, 6, 8, 4],
 [9, 9, 2, 6],
 [0, 4, 8, 0],
 [4, 5, 9, 0],
 [4, 4, 2, 9],
 [9, 6, 8, 8],
 [6, 0, 3, 2],
 [2, 7, 2, 7],
 [9, 6, 7, 0],
 [7, 2, 5, 9],
 [3, 8, 2, 7],
 [2, 3, 9, 7],
 [9, 0, 3, 4],
 [6, 6, 1, 0],
 [9, 7, 9, 5],
 [2, 9, 8, 4],
 [5, 9, 3, 4],
 [4, 1, 1, 4],
 [9, 2, 2, 1],
 [4, 3, 4, 3],
 [5, 4, 6, 7],
 [7, 5, 1, 4],
 [1, 3, 5, 2],
 [8, 6, 2, 1],
 [6, 1, 1, 6],
 [3, 5, 9, 1],
 [9, 2, 0, 2],
 [1, 5, 9, 3],
 [4, 1, 8, 1],
 [1, 0, 8, 3],
 [4, 3, 9, 1],
 [2, 8, 7, 7],
 [3, 3, 7, 5],
 [3, 7, 0, 3],
 [4, 4, 7, 1], [3, 4, 8, 5],[3, 3, 0, 9],[1, 1, 0, 4],
 [0, 0, 7, 6],[4, 7, 8, 0],[8, 3, 6, 6],[7, 0, 5, 7],[8, 8, 0, 8],[5, 2, 4, 0],[8, 5, 5, 3],[4, 3, 4, 9],[0, 0, 0, 3],[8, 6, 9, 2]]

# Calculate the inversion count for each sublist using brute force
brute_force_inversion_counts = [count_inversions_brute_force(sublist) for sublist in students_random_numbers]

# Calculate the inversion count for each sublist using divide and conquer
divide_and_conquer_inversion_counts = [count_inversions_divide_and_conquer(sublist[:]) for sublist in students_random_numbers]

# Calculate the total inversion count across all students for both methods
total_inversion_count_brute_force = sum(brute_force_inversion_counts)
total_inversion_count_divide_and_conquer = sum(divide_and_conquer_inversion_counts)

# Function to categorize inversion counts
def categorize_inversion_counts(inversion_counts):
    categories = {}
    for index, count in enumerate(inversion_counts):
        if count not in categories:
            categories[count] = []
        categories[count].append(index + 1)  # Storing student index (1-based)
    return categories

# Categorize inversion counts for both brute force and divide and conquer methods
brute_force_categories = categorize_inversion_counts(brute_force_inversion_counts)
divide_and_conquer_categories = categorize_inversion_counts(divide_and_conquer_inversion_counts)

# Display the results
print("Total inversion count (Brute Force) across all students:", total_inversion_count_brute_force)
print("Total inversion count (Divide and Conquer) across all students:", total_inversion_count_divide_and_conquer)

print("\nCategorized Inversion Counts (Brute Force):")
for count, students in sorted(brute_force_categories.items()):
    print(f"Inversion Count {count}: Students {students}")

print("\nCategorized Inversion Counts (Divide and Conquer):")
for count, students in sorted(divide_and_conquer_categories.items()):
    print(f"Inversion Count {count}: Students {students}")