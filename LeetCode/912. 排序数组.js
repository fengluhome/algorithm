/* 
  给定一个整数数组 nums，将该数组升序排列。
*/
/**
 * @param {number[]} nums
 * @return {number[]}
 */

// sort
var sortArray = function(nums) {
  return nums.sort((a, b) => a - b);  
};

// 冒泡排序，从后向前遍历。
var sortArray = function(nums) {
  for(let i=nums.length-1; i>0; i--) {
    // 如果一轮比较中没有需要交换的数据，则说明数组已经有序
    let mark = true;
    for(let j=0; j<i; j++) {
      if(nums[j] > nums[j+1]) {
        [nums[j], nums[j+1]] = [nums[j+1], nums[j]];
        mark = false;
      }
    }
    if(mark)  return nums;
  }
  return nums;
}

// 冒泡排序，从前向后遍历。
var sortArray = function(nums) {
  for(let i=0, len=nums.length; i<len-1; i++) {
    // 如果一轮比较中没有需要交换的数据，则说明数组已经有序
    let mark = true;
    for(let j=0; j<len-i-1; j++) {
      if(nums[j] > nums[j+1]) {
        [nums[j], nums[j+1]] = [nums[j+1], nums[j]];
        mark = false;
      }
    }
    if(mark)  return nums;
  }
  return nums;
}

// 双向冒泡
var sortArray = function(nums) {
  for(let i=0, len=nums.length; i<len-1; i++) {
    let mark = true;
    // 找到最大值放到右边
    for(let j=0; j<len-i-1; j++) {
      if(nums[j] > nums[j+1]) {
        [nums[j], nums[j+1]] = [nums[j+1], nums[j]];
        mark = false;
      }
    }
    // 找到最小值放到左边
    for(let t=len-i-2; t>0; t--) {
      if(nums[t] < nums[t-1]) {
        [nums[t], nums[t-1]] = [nums[t-1], nums[t]];
        mark = false;
      }
    }
    if(mark)  return nums;
  }
  return nums;
}

// 选择排序
var sortArray = function(nums) {
  for(let i=0, len=nums.length; i<len; i++) {
    for(let j=i+1; j<len; j++) {
      if(nums[i] > nums[j]) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }
  }
  return nums;
}

// 快速排序，填坑法
var sortArray = function(nums) {
  function quickSort(arr, left, right) {
    if(left >= right)  return arr;
    // 确定基数的位置
    let index = partition(arr, left, right);
    quickSort(arr, left, index - 1);
    quickSort(arr, index + 1, right);
    return arr;
  }
  function partition(arr, left, right) {
    // 取第一个数为基数
    let temp = arr[left];
    while(left < right) {
      while(left < right && arr[right] >= temp)  right--;
      arr[left] = arr[right];
      while(left < right && arr[left] < temp)  left++;
      arr[right] = arr[left];
    }
    arr[left] = temp;
    return left;
  }
  return quickSort(nums, 0, nums.length-1);
};

// 快速排序，交换两节点
var sortArray = function(nums) {
  function partition(arr, left, right) {
    let temp = arr[left];
    let p = left + 1;
    let q = right;
    while(p <= q) {
      while(p <= q && arr[p] < temp)  p++;
      while(p <= q && arr[q] > temp)  q--;
      if(p <= q) {
        [arr[p], arr[q]] = [arr[q], arr[p]];
        p++;
        q--;
      }
    }
    [arr[left], arr[q]] = [arr[q], arr[left]];
    return q;
  }
  function quickSort(arr, left, right) {
    if(left >= right)  return arr;
    let index = partition(arr, left, right);
    quickSort(arr, left, index - 1);
    quickSort(arr, index + 1, right);
    return arr;
  }
  return quickSort(nums, 0, nums.length-1);
};

// 归并排序
var sortArray = function(nums) {
  function merge(l1, r1, l2, r2) {
    let arr = [];
    let index = 0;
    let i = l1, j = l2;
    while(i <= r1 && j <= r2) {
      arr[index++] = nums[i] < nums[j] ? nums[i++] : nums[j++];
    }
    while(i <= r1)  arr[index++] = nums[i++];
    while(j <= r2)  arr[index++] = nums[j++];
    for(let t=0; t<index; t++) {
      nums[l1 + t] = arr[t];
    }
  }
  function mergeSort(left, right) {
    if(left >= right)  return nums;
    let mid = parseInt((right - left) / 2) + left;
    mergeSort(left, mid);
    mergeSort(mid+1, right);
    merge(left, mid, mid+1, right);
    return nums;
  }
  return mergeSort(0, nums.length-1);
};

// 插入排序
var sortArray = function(nums) {
  for(let i=1, len=nums.length; i<len; i++) {
    let temp = nums[i];
    let j = i;
    while(j >= 0 && temp < nums[j-1]) {
      nums[j] = nums[j-1];
      j--;
    }
    nums[j] = temp;
  }
  return nums;
}

// 桶排序
// 将数组元素有序分配到n个桶里，最后再合并各个桶
var sortArray = function(nums) {
  function bucketSort(nums) {
    // 桶的个数，只要是正数即可
    let num = 5;
    let max = Math.max(...nums);
    let min = Math.min(...nums);
    // 计算每个桶存放的数值范围，至少为1，
    let range = Math.ceil((max - min) / num) || 1;
    // 创建二维数组，第一维表示第几个桶，第二维表示该桶里存放的数
    let arr = Array.from(Array(num)).map(() => Array());
    nums.forEach(val => {
      // 计算元素应该分布在哪个桶
      let index = parseInt((val - min) / range);
      // 防止index越界，例如当[5,1,1,2,0,0]时index会出现5
      index = index >= num ? num - 1 : index;
      let temp = arr[index];
      // 插入排序，将元素有序插入到桶中
      let j = temp.length - 1;
      while(j >= 0 && val < temp[j]) {
        temp[j+1] = temp[j];
        j--;
      }
      temp[j+1] = val;
    })
    // 修改回原数组
    let res = [].concat.apply([], arr);
    nums.forEach((val, i) => {
      nums[i] = res[i];
    })
  }
  bucketSort(nums);
  return nums;
}

// 基数排序
// 使用十个桶0-9，把每个数从低位到高位根据位数放到相应的桶里。
// 只能排列正整数
function radixSort(nums) {
  // 计算位数
  function getDigits(n) {
    let sum = 0;
    while(n) {
      sum++;
      n = parseInt(n / 10);
    }
    return sum;
  }
  let arr = Array.from(Array(10)).map(() => Array());
  let max = Math.max(...nums);
  let maxDigits = getDigits(max);
  for(let i=0, len=nums.length; i<len; i++) {
    // 用0把每一个数都填充成相同的位数
    nums[i] = (nums[i] + '').padStart(maxDigits, 0);
    // 先根据个位数把每一个数放到相应的桶里
    let temp = nums[i][nums[i].length-1];
    arr[temp].push(nums[i]);
  }
  // 循环判断每个位数
  for(let i=maxDigits-2; i>=0; i--) {
    // 循环每一个桶
    for(let j=0; j<=9; j++) {
      let temp = arr[j]
      let len = temp.length;
      // 根据当前的位数i把桶里的数放到相应的桶里
      while(len--) {
        let str = temp[0];
        temp.shift();
        arr[str[i]].push(str);
      }
    }
  }
  // 修改回原数组
  let res = [].concat.apply([], arr);
  nums.forEach((val, index) => {
    nums[index] = +res[index];
  }) 
}