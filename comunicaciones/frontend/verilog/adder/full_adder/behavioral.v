module full_adder (s,c,a,b);
input a,b,cin;
output s,c;

always @ (*)
begin
    s = a ^ b ^ cin;
    c = (a & b) | (a & cin) | (b & cin);
    
end
endmodule
