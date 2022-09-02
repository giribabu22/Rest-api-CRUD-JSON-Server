import axo from "axios";
import ask from 'readline-sync'

const createAc = async ()=>{
  const d = {"name":ask.question('enter the name: '),"email":ask.question('enter the email: '),"phone-no":ask.question('enter the phone-no: '),"pin":ask.question('enter the pin: ')};
  await axo.post('http://localhost:3000/post',d)
  .then((r)=>{console.log("-----create succesfully-----");})
  .catch((err)=>{console.error(err)});
  run()
}
function suc(v){
  console.log(typeof v,typeof v == 'undefined',undefined);
  if (typeof v == 'undefined'){
    console.log('this name is not in the data!!');
  }else{}
}
async function run(){
    console.log('\n~~~~~~~~ wel-come ~~~~~~~~~');
    console.log("\n\t1) create\n\t2) update \n\t3) delete \n\t4) Read \n\t0) exit");
    const choice = ask.question('\nenter you chooise: ')
    if (choice == 1){
      createAc()
    }else if (choice == 2) {
        const gmail = ask.question('enter the `email`: ')
        const arr = ['name','phone-no','pin','email']
        console.log(' 1) name\n 2) phone-no\n 3) pin\n 4) email');
        const what = ask.questionInt('enter the update value: ')
          const value = ask.question('enter what you want to value: ')
          const dic = {}
          dic[`${arr[what-1]}`] = value
          const res = await axo(`http://localhost:3000/post?email=${gmail}`).then((res)=>{return res.data}).catch((e)=>console.log(e.massage));
          await axo.patch(`http://localhost:3000/post/${res[0]['id']}`,dic).then((res)=>{console.log(res.data)}).catch((e)=>console.log(e))
      run()
    }else if (choice == 3) {
      const value = ask.question('enter the `EMAIL`: ')
      const res = await axo(`http://localhost:3000/post?email=${value}`)
      .then((res)=>{return res.data})
      .catch(e=>console.log(e.massage))
      await axo.delete(`http://localhost:3000/post/${res[0]['id']}`)
      console.log('\n--succesfully_delete--');
      run()
    }else if (choice == 4) {
      const value = ask.question('enter the `EMAIL`: ')
      const r = await axo(`http://localhost:3000/post?email=${value}`).then((res)=>{console.log(res.data); return res.data;}).catch((e)=>console.log(e))
      suc(r[0])
      run()
    }else if (choice == 0){console.log('bye sir');}
  };
run()