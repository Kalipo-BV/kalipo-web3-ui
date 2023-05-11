export default{
    
}

export async function getAllIds() {
    const existingAccoundIdWrapper = await this.$invoke("grantContract:getAll");
    console.log(existingAccoundIdWrapper);
};

export async function getBySetIdTest() {       
    const existingAccoundIdWrapper = await this.$invoke(
    "grantContract:getByID",
    { id: "4c8dc0218fe5189de638e6d83d15e5ce0a6f89368c0522926cc468bdda0e0f58" },
    );
    console.log(existingAccoundIdWrapper);
};

export async function getAllWithInfo() {       
    const existingAccoundIdWrapper = await this.$invoke("grantContract:getAllInfo");
    console.log(existingAccoundIdWrapper); 
};
